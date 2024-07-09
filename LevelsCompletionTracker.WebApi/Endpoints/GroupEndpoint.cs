using FastEndpoints;


namespace LevelsCompletionTracker.WebApi.Endpoints
{
    public class GroupEndpoint : Group
    {
        public GroupEndpoint(string endpointGroupName, string routePrefix = "")
        {
            Configure(routePrefix, ep =>
            {
                ep.DontAutoTag();
                ep.Description(builder => builder.WithTags(endpointGroupName));
            });
        }
    }
}
