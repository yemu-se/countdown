import { useState, useEffect } from 'react'
function CountDownTimer() {
  const [eventName, setEventName] = useState("")
  const [eventDate, setEventDate] = useState("")
  const [CountDownStarted, setCountDownStart] = useState(false)
  const [remaingTime, setRemaingTime] = useState(0)

  useEffect(() => {
    if (eventDate && CountDownStarted) {
      const countDownInterval = setInterval(() => {
        const currentTime = new Date().getTime() //Date.now() we can
        const evetTime = new Date(eventDate).getTime()//getTime() returns the timestamp in milliseconds
        // new Date(eventDate) parses the date into a Date object
        const timeRemaining = evetTime - currentTime

        if (timeRemaining <= 0) {
          setRemaingTime(0)
          clearInterval(countDownInterval)
          alert('count down complete')
        }
        setRemaingTime(timeRemaining)
      }, 1000)
      return () => clearInterval(countDownInterval)
    }
  }, [eventDate, CountDownStarted])


  useEffect(() => {
    if (CountDownStarted) {
      document.title = eventName
    }
  }, [CountDownStarted, eventName])

  const handleSetCountDown = () => {
    setCountDownStart(true)
  }


  const handleStopCountdown = () => {
    setCountDownStart(false)
    setRemaingTime(0)
    localStorage.setItem("event date", eventDate)
    localStorage.setItem("event name", eventName)
  }

  const handleResetCountdown = () => {
    setCountDownStart(false)
    setRemaingTime(0)
    setEventDate("")
    setEventName("")
    localStorage.removeItem("event date", eventDate)
    localStorage.removeItem("event name", eventName)
  }

  const formatDate = (date) => {
    const options = { month: "long", day: "numeric", year: "numeric" }
    return new Date(date).toLocaleDateString("en-US", options)
  }

  const formatTime = (time) => {
    const seconds = Math.floor(time / 1000) % 60
    const minutes = Math.floor(seconds / 60) % 60
    const hours = Math.floor(minutes / 60) % 60
    const days = Math.floor(hours / 24)

    return (
      <div className='countdown-display'>
        <div className="countdown-value">
          {days.toString().padStart(2, "0")} <span>days</span>
        </div>
        <div className="countdown-value">
          {hours.toString().padStart(2, "0")} <span>hours</span>
        </div>
        <div className="countdown-value">
          {minutes.toString().padStart(2, "0")} <span>minutes</span>
        </div>
        <div className="countdown-value">
          {seconds.toString().padStart(2, "0")} <span>seconds</span>
        </div>
      </div>
    )
  }

  return (
    <div className="cout-timer-container">
      <h2 className="countDown-name">{CountDownStarted ? eventName : "CountDown Timer"}</h2>
      {!CountDownStarted ? (
        <form className='countdown-form'>
          <label htmlFor="title">Event Name</label>
          <input
            name='title'
            type='text'
            placeholder='Enter Event Name'
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
          <label htmlFor="data-picker">Event Date</label>
          <input
            name='data-picker'
            type="text"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            onClick={(e) => (e.target.type = "Date")}
          />
          <button onClick={handleSetCountDown}>Start Countdown</button>
        </form>


      ) : (
        <>
          {formatTime(remaingTime)}
          <div className="control-buttons">
            <button onClick={handleStopCountdown}>Stop</button>
            <button onClick={handleResetCountdown}>Reset</button>
          </div>
        </>

      )}
    </div>

  )

}

export default CountDownTimer
