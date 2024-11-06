'use client'
import { useSearchParams } from "next/navigation"

export default function LogError() {
    const param = useSearchParams()
    let err = param.get('error')
    return (
        err && (
            <p style={{ color: 'red' }}>Ops error: {err}</p>)
    )
}