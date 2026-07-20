import logging
import os
import tempfile
from fastapi import FastAPI, File, UploadFile, HTTPException
from paddleocr import PaddleOCR

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("ocr-service")

app = FastAPI()

ocr_engine = PaddleOCR(use_textline_orientation=True, lang="en", enable_mkldnn=False)


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.post("/ocr")
async def run_ocr(file: UploadFile = File(...)):
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image.")

    tmp_path = None

    try:
        contents = await file.read()

        if not contents:
            raise HTTPException(status_code=400, detail="Empty file received.")

        suffix = os.path.splitext(file.filename)[1] or ".jpg"
        with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
            tmp.write(contents)
            tmp_path = tmp.name

        result = ocr_engine.predict(tmp_path)

        lines = []
        raw_lines = []

        for res in result:
            rec_texts = res.get("rec_texts", [])
            rec_scores = res.get("rec_scores", [])

            for text, score in zip(rec_texts, rec_scores):
                lines.append(text)
                raw_lines.append({"text": text, "confidence": round(float(score), 4)})

        full_text = "\n".join(lines)

        logger.info(f"OCR processed {file.filename}: {len(lines)} lines")

        return {
            "success": True,
            "text": full_text,
            "lines": raw_lines,
        }

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"OCR failed for {file.filename}: {str(e)}")
        raise HTTPException(status_code=500, detail=f"OCR processing failed: {str(e)}")
    finally:
        if tmp_path and os.path.exists(tmp_path):
            os.remove(tmp_path)