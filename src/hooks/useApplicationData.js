import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`),
    ])
      .then((all) => {
        setState({
          ...state,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        });
      })
      .catch((error) => {
        console.error("Error fetching days:", error);
      });
    // eslint-disable-next-line
  }, []);

  const updateSpots = function (dayName, days, appointments) {
    const day = days.find((d) => d.name === dayName);

    const spots = day.appointments.filter(
      (id) => appointments[id].interview === null
    ).length;

    const newDay = { ...day, spots };
    const newDays = days.map((d) => (d.name === dayName ? newDay : d));

    return newDays;
  };

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],

      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    console.log("testing", axios.put)
    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then(() => {
        const days = updateSpots(state.day, state.days, appointments);

        setState({
          ...state,
          appointments,
          days,
        });
      });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const url = `/api/appointments/${id}`;

    let req = {
      url,
      method: "DELETE",
    };
    return axios
    .delete(url)
    .then(() => {
      const days = updateSpots(state.day, state.days, appointments);

      setState({
        ...state,
        appointments,
        days,
      });
    });
  }
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
