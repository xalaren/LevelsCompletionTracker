namespace LevelsCompletionTracker.Core.Model
{
    public class CircleRun
    {
        public int Id { get; set; }

        public int LevelId { get; set; }
        public Level Level { get; set; } = null!;

        public DateTime CreatedAt { get; set; }
        public int Attempts { get; set; }

        public int Count { get; set; } = 1;
    }
}
