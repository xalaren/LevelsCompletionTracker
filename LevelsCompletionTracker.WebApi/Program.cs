using System.Configuration;
using System.Diagnostics;
using System.Security.Policy;
using LevelsCompletionTracker.Adapter.ContextsEF;
using LevelsCompletionTracker.Adapter.RepositoriesEF;
using LevelsCompletionTracker.Adapter.Transaction;
using LevelsCompletionTracker.Core.Interactors;
using LevelsCompletionTracker.Core.Repositories;
using LevelsCompletionTracker.Core.Transaction;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

namespace LevelsCompletionTracker.WebApi
{
    class Program
    {
        static void Main(string[] args)
        {
            var port = 5173;

            Process.Start(new ProcessStartInfo
            {
                FileName = $"http://localhost:{port}",
                UseShellExecute = true
            });

            CreateHostBuilder(args, port).Build().Run();

            Console.ReadKey();
        }

        public static IHostBuilder CreateHostBuilder(string[] args, int port) => Host.CreateDefaultBuilder(args)
                      .ConfigureWebHostDefaults(webBuilder =>
        {
            webBuilder.UseStartup<Startup>();
            webBuilder.UseUrls($"http://localhost:{port}");
        });
    }
}