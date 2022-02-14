> Rule 1: Start with a High-Level View of the objects and their relationships before your deal with specific fields
> 

The reason for this is that we don’t need specific data on our relationships, we can just keep the data in the relationship itself and not in the implementations of it.

> Rule 2: Never expose implementation details
> 

We never should return specifications of implementations (relationships for example) we just need to return the necessary data that we already fetch from the relationships.

> Rule 3: Design your API around your business domain
> 

This means that we don’t need specific relationships for example when we group certain data it’s useless that we create many groups for specific filters, instead of that we just need of group or filter that allows us to filter or group any kind of data.
It does not make sense to return specific data grouped or filter, instead, we need to be able to group or filter any data.

> Rule 4: It’s easier to add fields than to remove them
> 

We need to ask ourselves if the data that we are adding to our schemas is really necessary, ‘cause if we delete this in the future we can break our application.

> Rule 5: Group Closely-Related Fields Together into their own Sub-Objects
> 

This rule helps us to simplify our APIs because we need to keep the data of the objects isolated from other objects that don’t care about their parents or child data.

> Rule 6: Always check if a List should be paginated
> 

This allows us to control the way that we show the data ‘cause if we have a big amount of data we can spend a lot of resources trying to retrieve all this data in every request.

It’s inefficient, slow, and useless to retrieve a lot of data, the user can’t see all this data at the first time.

> Rule 7: Always use objects
> 

This means that if for example, we have a relationship or an image, we always should return an object with the specifications of these values rather than a simple ID.

We never refer for an ID, we need the entity of the object itself

> Rule 8: Choose Field Names Based on What makes sense, Not the implementation
> 

This means that we need to choose a very descriptive name field instead of the implementation that we are going to use for that field

> Rule 9: Use enums for Fields that can Only Take A specific set of values
> 

This means that we need to specify when it's necessary ‘cause if we make the fields that are not definitely dynamic just strings we can corrupt our data with data that is not allowed on specific fields.

For example, a set of features needs to keep certain features, not any random string.

> Rule 10: Your API should provide business logic, Not Just data
> 

This means that our API needs to be very clear on how and what is retrieving, instead of just retrieving data that has not had a clear purpose.

In this way, we prevent the client does a lot of things on the client-side to for example check if certain data exists, and also our API has more features with this approach.

> Rule 11: Write Separate mutations for separate logical actions on a resource
> 

This means that we need to separate all kinds of mutations that are complex or large, ‘cause these mutations can be very large and complex methods.

With this approach, we can handle in a more efficient way mutations

> Rule 12 - For Relationship Mutations, always consider whether it would be useful to operate on multiple elements at once
> 

This means that when we have relationships we don’t should to update these relationships in a single method, instead of that we need to update them separately.

> Rule 13 - Prefix Mutation Names with the Object for Alphabetical Grouping
> 

<group> <Action>

<Action> <group>

We need to use the group > action.

This can no make sense in a grammatical way, because as we may know this is wrong in English grammar, but this convention is useful ‘cause we can group all of our mutations in alphabetical order instead of just having it disordered, and we can get confused when there are a lot of mutations

> Rule 14 - Structure Mutation Inputs to Reduce Duplication, even if this requires relaxing requiredness constraints on certain fields
> 

This means that if we want to keep our code DRY we need to avoid repeating multiple times fields on our mutations, instead of that we need to reuse these fields in a separate input even if we need to relax fields.

> Rule 15 - Mutations Should Provide User/Business Level Errors  via user errors field on the mutation payload
> 

This means that we need to provide a specific error when needs to be applied ‘cause in this way we can tell our clients or users of the API what is going on at every moment.

This needs to be on the payload response so we can handle any kind of errors for every mutation in our APIv