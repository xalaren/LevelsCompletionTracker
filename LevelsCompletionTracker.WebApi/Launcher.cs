using Microsoft.AspNetCore.Hosting.Server.Features;
using Microsoft.AspNetCore.Hosting.Server;
using System.Diagnostics;

namespace LevelsCompletionTracker.WebApi
{
    public class Launcher
    {
        private static readonly TimeSpan ServerTimeout = TimeSpan.FromMinutes(1);
        private readonly IServer server;
        public Launcher(IServer server)
        {
            this.server = server;
        }

        public async Task Start(CancellationToken cancellationToken)
        {
            var url = await GetUrlWhenServerIsReady(cancellationToken);
            Process.Start(new ProcessStartInfo(url)
            {
                UseShellExecute = true,
            });
        }

        private async Task<string> GetUrlWhenServerIsReady(CancellationToken cancellationToken)
        {
            var sw = Stopwatch.StartNew();
            IServerAddressesFeature? addresses;
            do
            {
                addresses = server.Features.Get<IServerAddressesFeature>();

                if (addresses!.Addresses.Count > 0)
                    break;

                await Task.Delay(100, cancellationToken);
            } while (sw.Elapsed < ServerTimeout);

            return addresses.Addresses.Select(x => x.Replace("[::]", "localhost").Replace("+:", "localhost:")).Single();
        }
    }
}
