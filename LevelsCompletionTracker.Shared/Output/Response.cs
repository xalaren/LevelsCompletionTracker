namespace LevelsCompletionTracker.Shared.Output
{
    public class Response
    {
        public bool Error { get; set; }
        public string? ResultMessage { get; set; }
    }

    public class Response<T> : Response
    {
        public T? Value { get; set; }
    }
}
