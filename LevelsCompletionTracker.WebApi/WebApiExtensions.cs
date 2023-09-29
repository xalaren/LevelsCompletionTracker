namespace LevelsCompletionTracker.WebApi
{
    public static class WebApiExtensions
    {
        public static void OpenBrowserWhenReady(this WebApplication app)
        {
            app.Lifetime.ApplicationStarted.Register(() =>
            {
                var _ = app.Services.GetRequiredService<Launcher>().Start(app.Lifetime.ApplicationStopped);
            });
        }
    }
}
