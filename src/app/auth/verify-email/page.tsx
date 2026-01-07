import Link from "next/link";

export default function VerifyEmailPage() {
    return (
        <div className="min-h-screen pt-20 pb-12 flex items-center justify-center bg-gradient-to-br from-white via-[#00CED1]/5 to-[#D81B60]/5">
            <div className="absolute top-20 left-10 w-72 h-72 bg-[#00CED1]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#D81B60]/10 rounded-full blur-3xl" />

            <div className="relative z-10 w-full max-w-md px-4">
                <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-[#00CED1] to-[#D81B60] rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="text-4xl">✉️</span>
                    </div>

                    <h1 className="text-2xl font-bold text-gray-900 mb-4">
                        Verify Your Email
                    </h1>

                    <p className="text-gray-600 mb-6">
                        We&apos;ve sent a verification link to your email address. Please check
                        your inbox and click the link to verify your account.
                    </p>

                    <div className="p-4 bg-[#00CED1]/10 rounded-xl mb-6">
                        <p className="text-[#00CED1] text-sm">
                            Didn&apos;t receive the email? Check your spam folder or click below
                            to resend.
                        </p>
                    </div>

                    <button className="w-full py-3 border-2 border-[#00CED1] text-[#00CED1] font-semibold rounded-xl hover:bg-[#00CED1]/10 mb-4">
                        Resend Verification Email
                    </button>

                    <Link
                        href="/auth/login"
                        className="block w-full py-3 bg-gradient-to-r from-[#00CED1] to-[#D81B60] text-white font-semibold rounded-xl hover:shadow-lg"
                    >
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
