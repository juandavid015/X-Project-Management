import { Link } from "react-router-dom";
import { AddIcon, ChatIcon, DiscussionsIcon, DocumentIcon } from "../../assets/icons/Icons";
import { FeatureData, SectionData, data } from "./data";
import { useState } from 'react';

const LandingMain = () => {

    const initialState = {
        project: {
            featureToShow: 'Create',
            featureIndex: 0
        },
        task: {
            featureToShow: 'Create',
            featureIndex: 0
        }
    }
    const [sections, setSections] = useState(initialState);

    const changeSection = (
        titleSection: string, 
        featureName: string, 
        featureIndex: number
        ) => {

        setSections((prevSection) => {
            return {
                ...prevSection,
                [titleSection]: { 
                    featureToShow: featureName, 
                    featureIndex: featureIndex 
                }
            }
        })
    }

    const getFeatureInformation = (
        sectionName: keyof SectionData,
        featurePropertie: keyof FeatureData,
      ) => {
        const featureIndex = sections[sectionName].featureIndex
        // Add type constraint to ensure that T[K] has a 'features' property
        return (
            data[sectionName]
            .features[featureIndex][featurePropertie]
        );
       
      };

    return (
        <main className="font-sans text-base flex flex-col gap-8 ">
            {

                (Object.keys(data) as Array<'project' | 'task'>)
                .map((sectionName: 'project'| 'task', sectionIndex: number) => {

                    return (
                        <section id={data[sectionName]['title'].split(' ').join('_').toLowerCase()}
                        className="flex flex-col justify-center w-full
                        items-center odd:bg-white even:bg-white-purple p-8  gap-4"
                        key={'sect' + sectionIndex}
                        >
                            <h2 
                            className="sm:text-4xl text-3xl 
                            font-bold font-heading"
                            >
                                 {data[sectionName]['title']}
                            </h2>
                            <div className="max-w-[1048px] w-full flex flex-col gap-4">
                                <ul className="flex gap-8 text-purple">
                                    {
                                        data[sectionName].features
                                        .map((feature, featureIndex: number) => {

                                            return (
                                                <li 
                                                key={'feat' + featureIndex}
                                                className={`${sections[sectionName]
                                                .featureToShow === feature.title 
                                                && `after:h-[3px]`}
                                                relative origin-right after:content-['']
                                                after:absolute after:bottom-[0px] after:w-[100%] 
                                                after:bg-purple hover:after:h-[3px] 
                                                hover:after:animate-expand-right`}
                                                >
                                                    <button className="flex gap-2 items-center" 
                                                    onClick={() => 
                                                    changeSection(sectionName, feature.title, featureIndex)}
                                                    >
                                                        {feature.title}
                                                    </button>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                                <h3 className="sm:text-2xl text-xl font-heading 
                                inline-flex items-center gap-2
                                ">
                                    <AddIcon className="h-[20px]" />
                                    <span>
                                        {getFeatureInformation(sectionName, 'title')}
                                    </span>
                                </h3>
                                <p>
                                    {getFeatureInformation(sectionName, 'description')}
                                </p>
                                <div className="max-w-[1048px] w-auto max-h-[300px] overflow-hidden
                                rounded-md"
                                >
                                    <img src= {getFeatureInformation(sectionName, 'image')}
                                    alt="Screenshot of create task process"
                                    className="w-full h-full object-cover " />
                                </div>
                                <Link to={'/projects'}
                                className="bg-purple px-8 py-4 text-white w-fit 
                                m-auto rounded-full font-bold hover:shadow-lg"
                                >
                                    Get started
                                </Link>
                            </div>
                        </section>

                    )
                })


            }
          
            <section id="collaboration_spaces"
            className="flex flex-col justify-center 
            items-center odd:bg-white even:bg-white-purple p-8 gap-4"
            >
                <h2 className="sm:text-4xl text-3xl font-bold font-heading">
                    Collaboration spaces
                    <small
                        className="text-dark-med text-base">
                        {' Unavialable'}
                    </small>
                </h2>
                <div className="max-w-[1048px] w-full flex flex-col gap-2">
                    <div 
                    className="f-full bg-gray rounded-md
                    text-dark/100 p-4">
                        <span className="text-dark font-bold">
                            Note:
                        </span>
                        <p className="text-sm">
                            The features mentioned below still in developement and will be realeased on next updates.
                        </p>
                    </div>
                    <ul className="flex gap-8 text-purple/70 ">
                        <li>
                            <button 
                            className="flex gap-2 items-center">
                                Chat
                            </button>
                        </li>
                        <li>
                            <button>
                                File-sharing
                            </button>
                        </li>
                        <li>
                            <button>
                                Discussion room
                            </button>
                        </li>
                    </ul>
                    <h3 className="sm:text-2xl text-xl font-heading 
                        inline-flex items-center gap-2">
                        <span>
                            Chat
                        </span>
                        <ChatIcon 
                        className="h-[20px]" 
                        />
                        <small
                        className="text-dark-med text-base">
                            {' Unavialable'}
                        </small>
                    </h3>
                    <p>
                        Collaborate by creating groups and chat with your colleges.
                    </p>
                    <div 
                    className="max-w-[1048px] w-auto max-h-[300px] h-full 
                    overflow-hidden rounded-md flex gap-4 justify-around p-8">
                        {/* <img src={createTaskImg} alt="Screenshot of create task process"
                            className="w-full h-full object-cover" />
                            < */}
                        <ChatIcon 
                        className="h-[50px] fill-dark-med" 
                        />
                        <DocumentIcon 
                        className="h-[50px] fill-dark-med" 
                        />
                        <DiscussionsIcon 
                        className="h-[50px] fill-dark-med" 
                        />
                    </div>
                    <Link to={'/projects'}
                    className="bg-purple px-8 py-4 text-white 
                    w-fit m-auto rounded-full font-bold
                    m-auto rounded-full font-bold hover:shadow-lg">
                        Get started
                    </Link>
                </div>
            </section>

        </main>
    )
}
export default LandingMain;