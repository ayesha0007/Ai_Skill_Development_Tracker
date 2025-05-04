import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";

export const AppContext = createContext();

export const AppContextProvider = (props) => {

    const currency = import.meta.env.VITE_CURRENCY;
    const navigate = useNavigate();

    const [allCourses, setAllCourses] = useState([])

    const [isEducator, setIsEducator] = useState([true])
    const [enrolledCourses, setEnrolledCourses] = useState([])

    // Fetch All Courses and ensure courseRating is always an array
    const fetchAllCourses = async () => {
        const fixedCourses = dummyCourses.map(course => ({
            ...course,
            courseRating: Array.isArray(course.courseRating) ? course.courseRating : []
        }));
        setAllCourses(fixedCourses);
    };

    // Function to calculate average rating of course (Safe Version)
    const calculateRating = (course) => {
        if (!course || !Array.isArray(course.courseRating) || course.courseRating.length === 0) {
            return 0;
        }
        const totalRating = course.courseRating.reduce((sum, rating) => sum + rating.rating, 0);
        return totalRating / course.courseRating.length;
    }

    // Function to calculate course chapter time
    const calculateChapterTime = (chapter)=>{
        let time = 0
        chapter.chapterContent.map((lecture)=> time += lecture.lectureDuration)
        return humanizeDuration(time * 60 * 1000, {units : ['h', 'm']})
    }

    // Function to calculate course duration

    const calculateCourseDuration = (course) => {
        let totalDuration = 0;
        course.courseContent.forEach(chapter => {
          chapter.chapterContent.forEach(lecture => {
            totalDuration += lecture.lectureDuration;
          });
        });
        return humanizeDuration(totalDuration * 60 * 1000, { units: ["h", "m"] });
      }
      

    // Function to calculate no. of lectures in the course 
    const calculateNoOfLectures = (course) => {
        let totalLectures = 0;
        course.courseContent.forEach(chapter =>{
            if(Array.isArray(chapter.chapterContent)){
               totalLectures += chapter.chapterContent.length 
            }
        });
        return totalLectures;
    }

    //Fetch user enrolled courses 
    const fetchUserEnrolledCourses = async ()=>{
        setEnrolledCourses(dummyCourses)
    }

    useEffect(() => {
        fetchAllCourses()
        fetchUserEnrolledCourses()
    }, []);

    const value = {
        currency,
        allCourses,
        navigate,
        calculateRating,
        isEducator,
        setIsEducator,
        calculateNoOfLectures,
        calculateCourseDuration,
        calculateChapterTime,
        enrolledCourses,
        fetchUserEnrolledCourses
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};
