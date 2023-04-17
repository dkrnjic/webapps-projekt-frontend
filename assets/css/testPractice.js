 function init() {
            var calendar = document.getElementById("calendar");
            var days = localStorage.getItem("days");
            if (days) {
                days = JSON.parse(days);
                for (var i = 0; i < days.length; i++) {
                    addRow(calendar, days[i].day);
                }
            } else {
                days = [];
                addRow(calendar, "Day 1");
                days.push({day: "Day 1", text: ""});
            }
            localStorage.setItem("days", JSON.stringify(days));
        }

        function addDay() {
            var calendar = document.getElementById("calendar");
            var rows = calendar.getElementsByTagName("tbody")[0].getElementsByTagName("tr");
            var dayNum = rows.length + 1;
            var dayName = "Day " + dayNum;
            addRow(calendar, dayName);
            var days = JSON.parse(localStorage.getItem("days"));
            days.push({day: dayName, text: ""});
            localStorage.setItem("days", JSON.stringify(days));
        }

        function addRow(calendar, day) {
            var tbody = calendar.getElementsByTagName("tbody")[0];
            var row = document.createElement("tr");
            var numCol = document.createElement("td");
            var dayCol = document.createElement("td");
            numCol.textContent = tbody.getElementsByTagName("tr").length + 1;
            dayCol.textContent = day;
            row.appendChild(numCol);
            row.appendChild(dayCol);
            tbody.appendChild(row);
        }

        function loadDay(index) {
            var days = JSON.parse(localStorage.getItem("days"));
            var day = days[index - 1];
            document.getElementById("title2").value = day.day;
            document.getElementById("text").value = day.text;
        }

        function saveDay() {
            var days = JSON.parse(localStorage.getItem("days"));
            var dayIndex = parseInt(document.getElementById("calendar").getElementsByClassName("active")[0].getElementsByTagName("td")[0].textContent) - 1;
            var day = days[dayIndex];
            day.day = document.getElementById("title2").value;
            day.text = document.getElementById("text").value;
            localStorage.setItem("days", JSON.stringify(days));
        }