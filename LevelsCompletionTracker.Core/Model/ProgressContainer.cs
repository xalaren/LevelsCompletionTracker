namespace LevelsCompletionTracker.Core.Model
{
    public class ProgressContainer
    {
        public int Id { get; set; }

        public int LevelId { get; set; }
        public Level Level { get; set; }

        public ICollection<Progress> Progresses { get; set; } = new List<Progress>();

        public DateTime CreatedAt { get; set; }
    }
}