'use client';
// Tambahkan deklarasi tipe ini di bagian atas
declare global {
    interface Window {
      google: {
        accounts: {
          id: {
            initialize: (config: {
              client_id: string;
              callback: (response: { credential: string }) => void;
            }) => void;
            renderButton: (
              element: HTMLElement,
              options: { theme: string; size: string }
            ) => void;
            prompt: () => void;
          };
        };
      };
    }
  }
  // ... kode lainnya ...

import { setCookieOauth } from '@/app/patients/actions';
import { useEffect } from 'react';

export default function OauthButton() {
    useEffect(() => {
        window.google.accounts.id.initialize({
            client_id: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID as string,
            callback: async ({ credential }: { credential: string }) => {
                console.log("Encoded JWT ID token: " + credential);

                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/oauth`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ googleToken: credential }),
                    }
                    //     {
                    //     googleToken: response.credential,
                    // }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }

                const data = await response.json();
                console.log(data, "DATA OAUTH=========");

                setCookieOauth(data.access_token);
            }
        });
        window.google.accounts.id.renderButton(
            document.getElementById('buttonDiv') as HTMLElement,
            { theme: 'outline', size: 'large' },
        );

        window.google.accounts.id.prompt();
    }, []);

    return (
        <button
            id="buttonDiv"
            type="button"
            className=" text-black hover:bg-emerald-500 mt-5 w-full bg-emerald-300 text-[#fef7f1ff] py-2 rounded-lg shadow-lg hover:bg-brown-600 flex items-center justify-center"
        >
            Masuk Dengan Google
        </button>
    )
};