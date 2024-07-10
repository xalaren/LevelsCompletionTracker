using FastEndpoints;
using LevelsCompletionTracker.Core.Interactors;
using LevelsCompletionTracker.Shared.Output;

namespace LevelsCompletionTracker.WebApi.Endpoints.CircleRunEndpoints
{
    public class RemoveAllCircleRunsEndpoint : EndpointWithoutRequest<Response>
    {
        private readonly CircleRunInteractor circleRunInteractor;

        public RemoveAllCircleRunsEndpoint(CircleRunInteractor circleRunInteractor)
        {
            this.circleRunInteractor = circleRunInteractor;
        }

        public override void Configure()
        {
            Delete("remove-all");
            AllowAnonymous();
            Group<CircleRunEndpoints>();
        }

        public override async Task HandleAsync(CancellationToken token)
        {
            int levelId = Query<int>("levelId");

            var response = circleRunInteractor.RemoveAllCircleRunsFromLevel(levelId);

            int code = response.Error ? 400 : 200;

            await SendAsync(response, code, token);
        }
    }
}
