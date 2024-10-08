import React, { useEffect, useState } from "react";
import { Spacer } from "../../main";
import { localization, } from "../../../utils/main";
import dayjs from "dayjs";
import FileSelectorCard, { AcceptedFilesInfo } from "./fileSelectorCard";
import RecorderCard from "./recorderCard";
import OptionButtonXL from "../../buttons/optionButtonXL";
import { NavigationEvent } from "../../../types";
import { downloadFile } from "../../../utils/functions";
import UrlInput from "./urlInput";
const handMicIcon = require("../../../assets/images/3dHandMicIcon.png")
const tapeIcon = require("../../../assets/images/3dTapeIcon.png")

var localizedFormat = require('dayjs/plugin/localizedFormat')
dayjs.extend(localizedFormat)


interface CourseInputCardProps {
    navEvent: NavigationEvent[]
    record: boolean
    setRecord: (_: boolean) => any
    recording: boolean
    setRecording: (_: boolean) => any
    playing: boolean
    setPlaying: (_: boolean) => any
    loading: boolean
    setLoading: (_: boolean) => any
    file: File | undefined
    setFile: (_: File | undefined) => any
    onClickContinue: (blob: Blob, filename: string) => any
}
export default function CourseInputCard({
    navEvent, loading, setLoading,
    record, setRecord,
    recording, setRecording,
    playing, setPlaying,
    file, setFile,
    onClickContinue,
}: CourseInputCardProps) {
    // option 1 (MIC)
    const [mediaRecorder, setMediaRecorder] = React.useState<MediaRecorder>();
    const [chunks, setChunks] = React.useState<Blob[]>([]);
    const [audio, setAudio] = React.useState<HTMLAudioElement | null>(null);
    const [durationApprox, setDurationApprox] = useState(0);
    const [startedRecAt, setStartedRecAt] = React.useState<Date | undefined>();
    // option 2 (FILE)
    const [invalidFileType, setInvalidFileType] = React.useState(false);
    const [fileBlob, setFileBlob] = useState<Blob | undefined>();

    const inputRef = React.useRef<HTMLInputElement>(null);
    const hasFile = file !== undefined;
    const homeCard = !record && !hasFile;
    const acceptedFilesData = {
        ".txt": "text/plain",
        ".mp3": "audio/mpeg",
        ".mp4": "video/mp4",
        ".mpga": "audio/mpeg",
        ".m4a": "audio/mp4",
        ".wav": "audio/wav",
        ".mpeg": "video/mpeg",
        ".webm": "video/webm",
        ".pdf": "application/pdf",
        // ".rtf": "application/rtf",
        ".md": "text/markdown",
    }
    const acceptedMimeTypes = Object.values(acceptedFilesData).join(", ")
    const acceptedFiles = Object.keys(acceptedFilesData).join(", ")

    const styles: { [key: string]: React.CSSProperties } = {
    }

    // option 1 (MIC) 
    const handleStartRecording = () => {
        handlePauseAudio()
        setRecording(true)

        // 
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            console.log("getUserMedia supported.");
            navigator.mediaDevices
                .getUserMedia(
                    // constraints - only audio needed for this app
                    {
                        audio: true,
                    },
                )

                // Success callback
                .then((stream) => {
                    const newMediaRecorder = new MediaRecorder(stream, {
                        // "mimeType": "audio/mpeg" // desired ouput format (.mp3)
                    })
                    newMediaRecorder.start()
                    console.log(newMediaRecorder.state)
                    setMediaRecorder(newMediaRecorder)
                })

                // Error callback
                .catch((err) => {
                    console.error(`The following getUserMedia error occurred: ${err}`);
                });
        } else {
            console.log("getUserMedia not supported on your browser!");
        }
    }
    const handleStopRecording = () => {
        setRecording(false)
        if (!mediaRecorder) return
        mediaRecorder.stop();
        console.log(mediaRecorder.state);
    }
    const handlePlayAudio = () => {
        console.log("recorder stopped");
        console.log(mediaRecorder?.mimeType ?? "")

        try {
            const blob = new Blob(chunks, { type: mediaRecorder?.mimeType ?? "" });
            const audioURL = window.URL.createObjectURL(blob);
            const newAudio = new Audio(audioURL)
            newAudio.play(); setAudio(newAudio); setPlaying(true);
        } catch (error) {
            alert(error)
        }

    }
    const handlePauseAudio = () => {
        console.log("recorder stopped");
        if (audio) {
            setPlaying(false)
            audio.pause()
        }
    }
    useEffect(() => {
        if (!mediaRecorder) return
        mediaRecorder.ondataavailable = (e) => {
            setChunks(prevV => {
                return [...prevV, e.data]
            })
        };
    }, [mediaRecorder])
    useEffect(() => {
        const interval = setInterval(() => {
            if (recording)
                setDurationApprox(duration => {
                    return duration + 1
                });
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [recording]);
    // Add an event listener for the ended event
    audio?.addEventListener('ended', handlePauseAudio);


    const handleGoBack = () => {
        setLoading(false)
        if (record) {
            setRecord(false)
            handleStopRecording()
            handlePauseAudio()
            setChunks([])
            setAudio(null)
            setMediaRecorder(undefined)
            setDurationApprox(0)
            setStartedRecAt(undefined)
        } else if (hasFile) {
            setFile(undefined)
            setFileBlob(undefined)
            setInvalidFileType(false)
        }
    }
    const handleClickRecord = () => {
        setRecord(true)
        const now = new Date(); setStartedRecAt(now)
        handleStartRecording()
    }
    const handleClickFileSelector = () => {
        setInvalidFileType(false)
        inputRef.current?.click()
    }

    function handleFile(file: File) {
        const mimes = Object.values(acceptedFilesData) // .concat(["text/rtf"])
        if (!mimes.includes(file.type)) {
            setInvalidFileType(true)
            alert(file.type)
            return
        }
        // const file_uri = URL.createObjectURL(file)
        const blob = new Blob([file], { type: file.type });
        setFile(file)
        setFileBlob(blob)
        setInvalidFileType(false)

    };
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            handleFile(file);
        }
    };
    function InvisibleInput() {
        return (
            <input
                id="notStylableFileInput"
                type="file"
                accept={acceptedMimeTypes}
                style={{ display: 'none' }}
                ref={inputRef}
                onChange={handleInputChange}
            ></input>
        )
    };

    useEffect(() => {
        if (navEvent.length == 0) return
        switch (navEvent[navEvent.length - 1]) {
            case "open-record-page":
                handleClickRecord(); break
            case "click-file-selector":
                handleClickFileSelector(); break
            case "go-back":
                handleGoBack(); break
            case "stop-recording":
                handleStopRecording(); break
            case "start-recording":
                handleStartRecording(); break
            case "pause-audio":
                handlePauseAudio(); break
            case "play-audio":
                handlePlayAudio(); break
        }
    }, [navEvent])


    // OTHER 
    /*
    const uploadRecording = async () => {
        const filename = `audio-${"user123"}-${"abc"}.webm`
        const blob = new Blob(chunks, {
            type: mediaRecorder?.mimeType ?? "null"
        });
        handleUpload(blob, filename)
    }
    const handleUpload = async (blob: Blob, filename: string) => {
        try {
            setLoading(true)
            const response = await sofiaApi.devTest("dummyParam", blob, filename)
            alert(response)
            downloadTxtFile(response, "course-text")
        } catch (error) {
            console.log(error)
            alert(error)
        }
        setLoading(false)
    }
    const handleGetVocab = async () => {
        try {
            setLoading(true)
            const response = await sofiaApi.get(API_ENDPOINTS.DEV.VOCAB, { "t": "bla bla" })
            downloadTxtFile(response, "vocab")
        } catch (error) {
            alert(error)
        }
        setLoading(false)
    }
    const handleGetNumbers = async () => {
        try {
            setLoading(true)
            const response = await sofiaApi.get(API_ENDPOINTS.DEV.NUMBERS, { "t": "bla bla" })
            downloadTxtFile(response, "numbers")
        } catch (error) {
            alert(error)
        }
        setLoading(false)
    }
    */
    function getRecordingBlob() {
        const blob = new Blob(chunks, {
            type: mediaRecorder?.mimeType ?? "null"
        })
        return blob
    }
    const recordingFilename = `course-audio.webm`
    const handleDownloadRecording = () => {
        const blob = getRecordingBlob()
        downloadFile(blob, recordingFilename)
    }
    const handleContinue = () => {

        var blob = hasFile ? fileBlob! : getRecordingBlob()
        console.log({ blob, })
        var filename = hasFile ? file!.name : recordingFilename
        onClickContinue(blob, filename)
    }


    return (
        <React.Fragment>
            <InvisibleInput />
            {(() => {
                if (homeCard) {
                    return (
                        <MainContent
                            onCLickRecord={handleClickRecord}
                            onClickFile={handleClickFileSelector}
                            invalidFileType={invalidFileType}
                            acceptedFiles={acceptedFiles.replace(/\./g, "")}
                        />
                    )
                } else if (record) {
                    return (
                        <RecorderCard
                            loading={loading}
                            recording={recording}
                            onClickContinue={handleContinue}
                            startedRecAt={startedRecAt!}
                            audioDuration={durationApprox}
                            playingProgress={0}
                            onClickDonwload={handleDownloadRecording}
                        />
                    )
                } else if (hasFile) {
                    return (
                        <FileSelectorCard
                            file={file!}
                            onClickSelectFile={handleClickFileSelector}
                            onClickContinue={handleContinue}
                            acceptedFiles={acceptedFiles}
                            invalidFileType={invalidFileType}
                            loading={loading}
                        />)
                }
            })()}
        </React.Fragment>
    )
}

interface MainContentProps {
    onCLickRecord: () => any
    onClickFile: () => any
    invalidFileType: boolean
    acceptedFiles: string
}
function MainContent({ onCLickRecord, onClickFile,
    invalidFileType, acceptedFiles }: MainContentProps) {
    return (
        <React.Fragment>
            <OptionButtonXL
                name={localization.mic}
                description={localization.record_class}
                onCLick={onCLickRecord}
                image={handMicIcon}
            />
            <Spacer paddingSize="inner_small" />
            <OptionButtonXL
                name={localization.file}
                description={localization.use_file}
                onCLick={onClickFile}
                image={tapeIcon}
                bottom={<AcceptedFilesInfo
                    invalidFileType={invalidFileType}
                    acceptedFiles={acceptedFiles}
                />}
            />
            <Spacer paddingSize="inner_small" />
            <UrlInput />
        </React.Fragment>
    )
}


