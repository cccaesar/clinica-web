import { useRouter } from 'next/navigation';

export default function Navbar({paths}: {paths: string[]}) {
    const router = useRouter()
    return (
        <nav>
            <ul>
                {paths.map( (path, index) => (
                    <li key={index}>
                        <button onClick={() => router.push(path)}>{path}</button> 
                    </li>
                ))}
            </ul>
        </nav>
    )
}