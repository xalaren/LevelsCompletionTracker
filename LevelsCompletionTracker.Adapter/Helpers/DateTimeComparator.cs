namespace LevelsCompletionTracker.Adapter.Helpers
{
    public static class DateTimeComparator
    {
        public static bool IsComparedByDate(this DateTime dateFirst, DateTime comparedDate)
        {
            var firstYear = dateFirst.Year;
            var firstMonth = dateFirst.Month;
            var firstDay = dateFirst.Day;

            var comparedYear = comparedDate.Year;
            var comparedMonth = comparedDate.Month;
            var comparedDay = comparedDate.Day;

            return firstYear == comparedYear && firstMonth == comparedMonth && firstDay == comparedDay;
        }
    }
}