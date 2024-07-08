namespace LevelsCompletionTracker.Shared.DataTransferObjects
{
    public class LevelDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Author { get; set; } = null!;
        public string Difficulty { get; set; } = null!;
        public string Status { get; set; } = null!;
        public int Attempts { get; set; }
        public int MainProgress { get; set; }
        public int Priority { get; set; }
        public int CircleRunsTotalCount { get; set; } 
        public int CircleRunsTotalAttempts { get; set; }

        public List<ProgressContainerDto> ProgressContainers { get; set; } = new List<ProgressContainerDto>();
        public List<CircleRunDto> CircleRuns { get; set; } = new List<CircleRunDto>();
    }
}
