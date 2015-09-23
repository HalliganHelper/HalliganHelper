app = typeof app !== "undefined" ? app : {};

app.Course = Backbone.TastypieModel.extend({
    initialize: function( attributes, options ) {
        this.coursePk = attributes.coursePk;
        this.requests = new app.Requests([], this.attributes);
        this.officeHours = new app.OfficeHours([], this.attributes);
    },
    url: function() {
        return '/api/v2/course/' + this.coursePk;
    },
    handleOfficeHour: function( requestData ) {
        var course = this;
        if ( requestData.course_id != course.coursePk ) {
            return;
        }
        if ( requestData.type === 'office_hour_create' ) {
            var newOfficeHour = new app.OfficeHour({id: requestData.id});
            newOfficeHour.fetch({
                success: function(model, response, options) {
                    course.officeHours.add( model );
                }
            });
        } else if ( requestData.type === 'office_hour_update' ) {
            var oldOfficeHour = course.officeHours.get( requestData.id );

            if ( Boolean( oldOfficeHour ) && requestData.remove ) {
                course.officeHours.remove( oldOfficeHour );
            } else if ( Boolean( oldOfficeHour ) ) {
                oldOfficeHour.fetch();
            }
        }
    },
    handleRequest: function( requestData ) {
        var course = this;
        if ( requestData.course_id != course.coursePk ) {
            return;
        }
        if ( requestData.type === 'request_update' ) {
            var oldRequest = course.requests.get( requestData.id );
            if ( Boolean( oldRequest ) && requestData.remove ) {
                course.requests.remove( oldRequest );
            } else if ( Boolean( oldRequest ) ) {
                oldRequest.fetch();
            }
                
        } else if ( requestData.type === 'request_create' ) {
            var newRequest = new app.Request({id: requestData.id});
            newRequest.fetch({
                success: function(model, response, options) {
                    course.requests.add(model);
                }    
            });
        }
    }
});

