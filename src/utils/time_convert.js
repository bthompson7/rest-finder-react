/*

Since the yelp API gives us the time in military time we need to convert to "normal" time

*/

export function convert_military_time(military_time){
    var converted_time = "";
    var parsed_time = military_time.split("");
    var hours = Number(parsed_time[0] + parsed_time[1]);
    var minutes = Number(parsed_time[2] + parsed_time[3]);

    if (hours > 0 && hours <= 12) {
        converted_time = "" + hours;
    } else if (hours > 12) {
        converted_time= "" + (hours - 12);
    } else if (hours == 0) {
        converted_time = "12";
    }
 
    converted_time += (minutes < 10) ? ":0" + minutes : ":" + minutes; 
    converted_time += (hours >= 12) ? " P.M." : " A.M.";
    
    return converted_time
};