using System.Net.Http.Headers;
using LevelsCompletionTracker.Shared.Output;

namespace LevelsCompletionTracker.Core.Model
{
    public static class LevelStatus
    {
        public static string Active => "active";
        public static string Abandoned => "abandoned";
        public static string Completed => "completed";
    }

    public class Level
    {
        private int mainProgress = 0;
        private string status = "";

        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Author { get; set; } = null!;
        public string Difficulty { get; set; } = null!;
        public int Attempts { get; set; }
        public int Priority { get; set; }

        public int MainProgress
        {
            get => mainProgress;
            set
            {
                if (value < 0 || value > 100)
                {
                    throw new ArgumentOutOfRangeException("", "Progress is out of range");
                }

                if (value == 100)
                {
                    Status = LevelStatus.Completed;
                }
                else
                {
                    Status = LevelStatus.Active;
                }

                mainProgress = value;
            }
        }

        public string Status
        {
            get => status;
            set
            {
                if (string.IsNullOrWhiteSpace(value) || (!string.Equals(value, LevelStatus.Active) && !string.Equals(value, LevelStatus.Abandoned) && !string.Equals(value, LevelStatus.Completed)))
                {
                    throw new ArgumentOutOfRangeException("", "Status has only 3 variants: active, abandoned and completed");
                }

                status = value;

            }
        }

        public ICollection<ProgressContainer> ProgressContainers { get; set; } = new List<ProgressContainer>();
    }
}
