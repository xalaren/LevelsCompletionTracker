namespace LevelsCompletionTracker.Shared.DataTransferObjects
{
    public class CircleRunDto
    {
        public int Id { get; set; }
        public int LevelId { get; set; }
        public int Attempts { get; set; }
        public int Count { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
