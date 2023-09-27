using System.Net.Http.Headers;
using LevelsCompletionTracker.Shared.Output;

namespace LevelsCompletionTracker.Core.Model
{
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
                    Status = "completed";
                }
                else
                {
                    Status = "active";
                }

                mainProgress = value;
            }
        }

        public string Status
        {
            get => status;
            set
            {
                if (string.IsNullOrWhiteSpace(value) || (!string.Equals(value, "active") && !string.Equals(value, "abandoned") && !string.Equals(value, "completed")))
                {
                    throw new ArgumentOutOfRangeException("", "Status has only 3 variants: active, abandoned and completed");
                }

                status = value;

            }
        }

        public ICollection<ProgressContainer> ProgressContainers { get; set; } = new List<ProgressContainer>();
    }
}
