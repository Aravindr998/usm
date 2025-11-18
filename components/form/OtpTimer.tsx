"use client"
import isEmpty from 'lodash.isempty'
import { MouseEvent, useCallback, useEffect, useRef, useState } from 'react'

interface OtpTimerProps {
    intervalPeriod: number,
    resend: () => void,
    error?: unknown,
    loading?: boolean
    data?: unknown
}

const OtpTimer = ({ intervalPeriod, resend, error, loading, data }: OtpTimerProps) => {

    const [timer, setTimer] = useState<number>()
    const [postLoadingMessage, setPostLoadingMessage] = useState("")

    const intervalRef = useRef<NodeJS.Timeout>(null)

    const setOtpTimer = useCallback(() => {
        if (intervalRef.current) clearInterval(intervalRef.current)
        intervalRef.current = setInterval(() => {
            setTimer(prevState => {
                if (prevState === undefined) {
                    return intervalPeriod
                } else if (prevState > 0) {
                    return prevState - 1
                }
                return 0
            })
        }, 1000)
    }, [intervalPeriod])

    useEffect(() => {
        if (!isEmpty(error)) {
            setPostLoadingMessage("Something went wrong, please try again")
        }
    }, [error])

    useEffect(() => {
        if (!isEmpty(data) && (data as {success: boolean})?.success) {
            setPostLoadingMessage("OTP Send Successfully")
        }
    }, [data])

    useEffect(() => {
        let timeout: NodeJS.Timeout
        if (postLoadingMessage) {
            timeout = setTimeout(() => {
                setPostLoadingMessage("")
            }, 1000)
        }
        return () => {
            if (timeout) clearTimeout(timeout)
        }
    }, [postLoadingMessage])

    useEffect(() => {
        if (intervalPeriod !== undefined) {
            setOtpTimer()
        }
        return () => {
            if (intervalRef.current)
                clearInterval(intervalRef.current)
        }
    }, [intervalPeriod, setOtpTimer])

    useEffect(() => {
        if (timer === 0 && intervalRef.current) {
            clearInterval(intervalRef.current)
        }
    }, [timer])

    useEffect(() => {
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current)
        }
    }, [])

    const handleResendOtp = async (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        try {
            if (intervalPeriod === undefined || (timer && timer > 0)) return
            await resend()
        } catch (error) {
            console.log(error)
        } finally {
        }
        setTimer(intervalPeriod)
        setOtpTimer()
    }


    let time
    if (timer !== undefined) {
        const minute = Math.floor(timer / 60)
        const seconds = Math.floor(timer % 60)
        time = `${minute < 10 ? "0" : ""}${minute}: ${seconds < 10 ? "0" : ""}${seconds}`
    }
    if (loading) return <a>Sending...</a>
    if (postLoadingMessage) return <a>{postLoadingMessage}</a>
    return (
        <a className="cursor-pointer" onClick={handleResendOtp}>Resend OTP {!!timer && time && <span>({time})</span>}</a>
    )
}

export default OtpTimer