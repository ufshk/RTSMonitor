# RTS Monitor

<h2> What it does </h2>
<p>
 RTS Monitor is a system that integrates hardware and software to present real-time data onto a web page, as well as notifying operators of system status via Slack messaging. Our system has the advantage of flexibility in that various types of sensor outputs can be tracked and displayed onto graphs. The RTS Monitor also enables two-way communication that allows operators to manipulate sensor control properties through our web UI. For example, an operator could enter a desired RPM value on the web UI, which in turn is received by the raspberry-pi that informs the motor controller to set the motor to the desired RPM.
</p>

<h2> How we built it </h2>
<p>
To track our data, we connected a Raspberry Pi to our sensors, and programmed the Pi using Python to send the data up onto the database we created using Google's Firebase platform. Storing our data, we were able to track and visualise data onto our React website in real-time, with virtually no time lag. To update potential users, we integrated our data into a Slackbot using Standard Library's Build tool, to allow us to automate the workflow, and connect to users whenever the circuit was found to be offline.
</p>
