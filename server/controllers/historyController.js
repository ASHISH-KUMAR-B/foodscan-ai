import Scan from "../models/Scan.js";

// GET /api/history - list all scans for the logged-in user
export const getHistory = async (req, res) => {
  try {
    const scans = await Scan.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .select("verdict healthScore safetyStatus allergens createdAt");

    return res.status(200).json({
      success: true,
      data: scans,
    });
  } catch (error) {
    console.error("History Controller Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch history.",
    });
  }
};

// GET /api/history/:id - get one full scan record
export const getHistoryById = async (req, res) => {
  try {
    const scan = await Scan.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!scan) {
      return res.status(404).json({
        success: false,
        message: "Scan not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: scan,
    });
  } catch (error) {
    console.error("History Controller Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch scan.",
    });
  }
};

// DELETE /api/history/:id
export const deleteHistory = async (req, res) => {
  try {
    const scan = await Scan.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!scan) {
      return res.status(404).json({
        success: false,
        message: "Scan not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Scan deleted.",
    });
  } catch (error) {
    console.error("History Controller Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to delete scan.",
    });
  }
};

export const getScanStats = async (req, res) => {
  try {
    const userId = req.user._id;

    const totalScans = await Scan.countDocuments({ user: userId });
    const healthyPicks = await Scan.countDocuments({ user: userId, healthScore: { $gte: 80 } });
    const warnings = await Scan.countDocuments({
      user: userId,
      safetyStatus: { $regex: "Caution|Unsafe", $options: "i" },
    });

    return res.status(200).json({
      success: true,
      data: { totalScans, healthyPicks, warnings },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};