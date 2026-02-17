/**
 * Creates a new comment
 * @async
 * @route POST /api/comments
 * @param {Object} req - Express request object
 * @param {string} req.body.text - The comment text content
 * @param {string} req.body.userId - The ID of the user creating the comment
 * @param {string} req.body.postId - The ID of the post being commented on
 * @param {Object} res - Express response object
 * @returns {Object} The saved comment object
 * @throws {Error} 500 - Internal server error if comment creation fails
 */

/**
 * Deletes a comment by ID
 * @async
 * @route DELETE /api/comments/:id
 * @param {Object} req - Express request object
 * @param {string} req.params.id - The ID of the comment to delete
 * @param {Object} res - Express response object
 * @returns {Object} Success message if comment is deleted
 * @throws {Error} 404 - Comment not found error
 * @throws {Error} 500 - Internal server error if deletion fails
 */
const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");

router.post("/api/comments", async (req, res) => {
    try {
        const { text, userId, postId } = req.body;
        const comment = new Comment({
            text,
            userId,
            postId
        });
        const savedComment = await comment.save();
        res.json(savedComment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;


// Add another end pont for deleting a comment
async (params) => {
    router.delete("/api/comments/:id", async (req, res) => {
        try {
            const commentId = req.params.id;
            const deletedComment = await Comment.findByIdAndDelete(commentId);
            if (!deletedComment) {
                return res.status(404).json({ error: "Comment not found" });
            }
            res.json({ message: "Comment deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}


