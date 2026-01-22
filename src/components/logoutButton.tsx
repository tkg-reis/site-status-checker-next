"use client";
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

type FormValues = Record<string, never>;

export default function LogoutButton() {
    const router = useRouter();
    const { handleSubmit, formState } = useForm<FormValues>();

    const onSubmit = async() => {
        const res = await fetch("/api/logout", {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type" : "application/json"
            }
        })

        if(!res.ok) {
            const data = await res.json()
            alert(data?.message ?? "Logout failed")
            return;
        }

        router.push("/login")
        router.refresh();
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <button type='submit' disabled={formState.isSubmitting}>
                {formState.isSubmitting ? "Logging out....." : "Logout"}
            </button>
        </form>
    )
}