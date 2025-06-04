"use client";
import React, { useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Video, Calendar, Clock, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const VideoConsultationPage = () => {
  const [activeCall, setActiveCall] = useState<number | false>(false);

  const upcomingAppointments = [
    {
      id: 1,
      doctorName: "Dr. Vansh Mehta",
      specialty: "Cardiologist",
      appointmentDate: "March 16, 2025",
      appointmentTime: "10:30 AM",
      duration: "30 minutes",
      profileImg: "/microsoft.jpg",
      status: "upcoming",
    },
    {
      id: 2,
      doctorName: "Dr. Michael Chen",
      specialty: "Dermatologist",
      appointmentDate: "March 18, 2025",
      appointmentTime: "2:00 PM",
      duration: "45 minutes",
      profileImg: "/microsoft.jpg",
      status: "upcoming",
    },
  ];

  const handleStartCall = (appointmentId: number) => {
    setActiveCall(appointmentId);
  };

  const handleEndCall = () => {
    setActiveCall(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Video Consultations
          </h1>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
            <Calendar className="h-5 w-5 mr-2" /> Book New Appointment
          </button>
        </div>

        {activeCall ? (
          <div className="bg-slate-800 rounded-xl p-4 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-white">
                Active Call:{" "}
                {
                  upcomingAppointments.find((app) => app.id === activeCall)
                    ?.doctorName
                }
              </h2>
              <button
                onClick={handleEndCall}
                className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="bg-slate-900 rounded-lg aspect-video flex items-center justify-center mb-4">
              <div className="text-center">
                <div className="h-24 w-24 rounded-full bg-slate-700 mx-auto mb-4 flex items-center justify-center">
                  <Video className="h-12 w-12 text-slate-400" />
                </div>
                <p className="text-slate-300">Connecting to video call...</p>
              </div>
            </div>
          </div>
        ) : null}

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">
            Upcoming Appointments
          </h2>
          <div className="grid gap-6">
            {upcomingAppointments.map((appointment) => (
              <Card
                key={appointment.id}
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-16 w-16 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700 mr-4">
                        <Image
                          src={appointment.profileImg}
                          alt={appointment.doctorName}
                          width={80}
                          height={80}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-slate-900 dark:text-white">
                          {appointment.doctorName}
                        </h3>
                        <p className="text-slate-500 dark:text-slate-400">
                          {appointment.specialty}
                        </p>
                        <div className="flex items-center mt-2 text-sm text-slate-600 dark:text-slate-300">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span className="mr-3">
                            {appointment.appointmentDate}
                          </span>
                          <Clock className="h-4 w-4 mr-1" />
                          <span>
                            {appointment.appointmentTime} (
                            {appointment.duration})
                          </span>
                        </div>
                      </div>
                    </div>
                    <Link href={"/VideoCall"}>
                      <button
                        onClick={() => handleStartCall(appointment.id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center"
                      >
                        <Video className="h-5 w-5 mr-2" /> Join Call
                      </button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoConsultationPage;
