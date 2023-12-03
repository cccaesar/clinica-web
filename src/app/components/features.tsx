import { PlusIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation';

export default function Features({ title, description, subject, registerDescription, children, }: { title: string, description: string, subject: string, registerDescription: string, children: React.ReactNode }) {
  const router = useRouter();
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {title}
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {description}
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            <div className="relative pl-16">
              <a className="cursor-pointer" onClick={() => router.push(`${subject}/cadastrar`)}>
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <PlusIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {registerDescription}
                </dt>
              </a>
            </div>
          </dl>
        </div>
        {children}
      </div>
    </div>
  )
}
