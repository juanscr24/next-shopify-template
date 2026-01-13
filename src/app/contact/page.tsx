import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
    return (
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-x-12">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">Get in touch</h1>
                    <p className="mt-6 text-lg text-neutral-600">
                        Have a question about our products or your order? We're here to help.
                    </p>

                    <dl className="mt-10 space-y-8">
                        <div className="flex gap-4">
                            <dt className="flex-none">
                                <span className="sr-only">Email</span>
                                <Mail className="h-7 w-6 text-neutral-400" aria-hidden="true" />
                            </dt>
                            <dd>
                                <a className="text-neutral-900 hover:text-neutral-600" href="mailto:hello@store.com">
                                    hello@store.com
                                </a>
                            </dd>
                        </div>
                        <div className="flex gap-4">
                            <dt className="flex-none">
                                <span className="sr-only">Telephone</span>
                                <Phone className="h-7 w-6 text-neutral-400" aria-hidden="true" />
                            </dt>
                            <dd>
                                <a className="text-neutral-900 hover:text-neutral-600" href="tel:+1 (555) 234-5678">
                                    +1 (555) 234-5678
                                </a>
                            </dd>
                        </div>
                        <div className="flex gap-4">
                            <dt className="flex-none">
                                <span className="sr-only">Address</span>
                                <MapPin className="h-7 w-6 text-neutral-400" aria-hidden="true" />
                            </dt>
                            <dd className="text-neutral-900">
                                123 Minimalist Way<br />
                                Design District, CA 90210
                            </dd>
                        </div>
                    </dl>
                </div>

                <form className="mt-16 lg:mt-0">
                    <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                        <div>
                            <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-neutral-900">
                                First name
                            </label>
                            <div className="mt-2.5">
                                <input
                                    type="text"
                                    name="first-name"
                                    id="first-name"
                                    autoComplete="given-name"
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-neutral-900 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-neutral-900">
                                Last name
                            </label>
                            <div className="mt-2.5">
                                <input
                                    type="text"
                                    name="last-name"
                                    id="last-name"
                                    autoComplete="family-name"
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-neutral-900 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="email" className="block text-sm font-semibold leading-6 text-neutral-900">
                                Email
                            </label>
                            <div className="mt-2.5">
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    autoComplete="email"
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-neutral-900 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="message" className="block text-sm font-semibold leading-6 text-neutral-900">
                                Message
                            </label>
                            <div className="mt-2.5">
                                <textarea
                                    name="message"
                                    id="message"
                                    rows={4}
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-neutral-900 sm:text-sm sm:leading-6"
                                    defaultValue={''}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-10">
                        <button
                            type="submit"
                            className="block w-full rounded-full bg-neutral-900 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-neutral-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 transition-colors"
                        >
                            Send message
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
