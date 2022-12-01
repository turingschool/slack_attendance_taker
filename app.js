function getAttendanceReport() {
    var slackLink = document.getElementById("slack_link").value;
    var channelId = getChannelId(slackLink)
    var timestamp = getTimestamp(slackLink)
    fetch(`https://slack-attendance-service.herokuapp.com/api/v0/attendance?channel_id=${channelId}&timestamp=${timestamp}`,{
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
      })
      .then(response=>response.json())
      .then(data=> appendData(data))
}

function getChannelId(slackLink) {
    return slackLink.split("/").at(-2);
}

function getTimestamp(slackLink) {
    return slackLink.split("/").at(-1).slice(1);
}

function appendData(data) {
    var mainContainer = document.getElementById("myData");
    var div = document.createElement("div");
    div.innerHTML = "Total Replies - " + data.total_replies;
    mainContainer.appendChild(div);
    for (var i = 0; i < data.data.length; i++) {
      var div = document.createElement("div");
      div.innerHTML = data.data[i].full_name + ' - ' + data.data[i].status;
      mainContainer.appendChild(div);
    }
  }