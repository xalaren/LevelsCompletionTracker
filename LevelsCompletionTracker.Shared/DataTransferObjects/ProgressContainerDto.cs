namespace LevelsCompletionTracker.Shared.DataTransferObjects
{
    public class ProgressContainerDto
    {
        public int Id { get; set; }
        public int LevelId { get; set; }
        public string CreatedAt { get; set; }
        public List<ProgressDto> Progresses { get; set; } = new List<ProgressDto>();
    }
}