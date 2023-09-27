namespace LevelsCompletionTracker.Core.Model
{
    public class Progress
    {
        private int percentageStart;
        private int percentageEnd;
        
        public int Id { get; set; }
        
        public int ProgressContainerId { get; set; }
        public ProgressContainer ProgressContainer { get; set; }

        public int PercentageStart
        {
            get => percentageStart;
            init
            {
                if (value < 0 || value > 100)
                    throw new ArgumentOutOfRangeException("", "Value was out of range");

                percentageStart = value;
            }
        }

        public int PercentageEnd
        {
            get => percentageEnd;
            init
            {
                if (value < 0 || value < percentageStart || value > 100)
                    throw new ArgumentOutOfRangeException("", "Value was out of range");

                percentageEnd = value;
            }
        }

        public int Count { get; set; }
    }
}
