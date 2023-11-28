import { PlusIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation';
import { ForwardRefExoticComponent, SVGProps, RefAttributes } from 'react';

interface featuresInterface {
  name: string;
  description: string;
  icon: ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, "ref"> & {
    title?: string | undefined;
    titleId?: string | undefined;
  } & RefAttributes<SVGSVGElement>>;
};

export default function Features({title, description, subject}: {title: string, description: string, subject: string}) {
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
            <div key='cadastrar medico' className="relative pl-16">
              <a className="cursor-pointer" onClick={() => router.push('medicos/cadastrar')}>
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <PlusIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  Cadastre um(a) novo(a) médico(a)
                </dt>
              </a>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}
