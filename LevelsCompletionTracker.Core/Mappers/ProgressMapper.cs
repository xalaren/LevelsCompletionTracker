using System.Text.RegularExpressions;
using LevelsCompletionTracker.Core.Model;
using LevelsCompletionTracker.Shared.DataTransferObjects;

namespace LevelsCompletionTracker.Core.Mappers
{
    public static class ProgressMapper
    {
        public static ProgressDto ToDto(this Progress progress)
        {
            if(progress == null)
            {
                throw new ArgumentNullException("Progress was null", nameof(progress));
            }

            var progressText = "";

            if (progress.PercentageStart != 0)
            {
                progressText = $"{progress.PercentageStart}-";
            }

            progressText += $"{progress.PercentageEnd}%";

            if (progress.Count > 1)
            {
                progressText += $" x{progress.Count}";
            }

            return new ProgressDto()
            {
                Id = progress.Id,
                ProgressText = progressText,
            };
        }

        public static Progress ToEnity(this ProgressDto progressDto)
        {
            if (progressDto == null)
            {
                throw new ArgumentNullException("", "ProgressDto was null");
            }

            var progressText = progressDto.ProgressText.Replace(" ", "").Replace("%", "");

            var regexSingleNumber = new Regex(@"(^(\d{1,3})$)");
            var regexSingleNumberMultiplied = new Regex(@"(^(\d{1,3})x(\d+)$)");
            var regexDoubledNumber = new Regex(@"(^(\d{1,3})-(\d{1,3})$)");
            var regexDoubledNumberMultiplied = new Regex(@"(^(\d{1,3})-(\d{1,3})x(\d+)$)");

            int progressStart = 0;
            int progressEnd = 0;
            int count = 1;

            if (regexSingleNumber.IsMatch(progressText))
            {
                progressEnd = int.Parse(regexSingleNumber.Replace(progressText, @"$2"));
            }
            else if (regexSingleNumberMultiplied.IsMatch(progressText))
            {
                progressEnd = int.Parse(regexSingleNumberMultiplied.Replace(progressText, @"$2"));
                count = int.Parse(regexSingleNumberMultiplied.Replace(progressText, @"$3"));
            }
            else if (regexDoubledNumber.IsMatch(progressText))
            {
                progressStart = int.Parse(regexDoubledNumber.Replace(progressText, @"$2"));
                progressEnd = int.Parse(regexDoubledNumber.Replace(progressText, @"$3"));
            }
            else if (regexDoubledNumberMultiplied.IsMatch(progressText))
            {
                progressStart = int.Parse(regexDoubledNumberMultiplied.Replace(progressText, @"$2"));
                progressEnd = int.Parse(regexDoubledNumberMultiplied.Replace(progressText, @"$3"));
                count = int.Parse(regexDoubledNumberMultiplied.Replace(progressText, @"$4"));
            }
            else
            {
                throw new ArgumentException("The progress was in an incorrect format.\nExample: 12%, 12-100%, 12-100% x4, ...");
            }

            return new Progress()
            {
                Id = progressDto.Id,
                PercentageStart = progressStart,
                PercentageEnd = progressEnd,
                Count = count,
            };
        }
    }
}
