using FastEndpoints;
using LevelsCompletionTracker.Core.Interactors;
using LevelsCompletionTracker.Shared.Output;

namespace LevelsCompletionTracker.WebApi.Endpoints.LevelEndpoints
{
    public class ChangePriorityEndpoint : EndpointWithoutRequest<Response>
    {
        private readonly LevelInteractor levelInteractor;

        public ChangePriorityEndpoint(LevelInteractor levelInteractor)
        {
            this.levelInteractor = levelInteractor;
        }

        public override void Configure()
        {
            Post("change-priority");
            AllowAnonymous();
            Group<LevelEndpoints>();
        }

        public override async Task HandleAsync(CancellationToken token)
        {
            int id = Query<int>("id");
            bool increase = Query<bool>("increase");

            var response = await levelInteractor.ChangePriority(id, increase);

            int code = response.Error ? 400 : 200;

            await SendAsync(response, code, token);
        }
    }
}
