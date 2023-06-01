import Form from '../components/ui/form'
import { Input } from '../components/ui/input'
import { useState } from 'react'
import { Upload } from '../components/ui/upload'
import Button from '../components/ui/button'

export const Converter = ({apiPath, title} : {apiPath: string, title: string}) => {

    const [email, setEmail] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [department, setDepartment] = useState('')
    const [project, setProject] = useState('')
    const [user, setUser] = useState('')
    const [file, setFile] = useState('')

    const submit = () => {
        const formData = new FormData();
        setLoading(true);

        try {
            formData.append('file', file);
            formData.append('email', email);
            formData.append('department', department);
            formData.append('project', project);
            formData.append('user', user);
            fetch(
                apiPath,
                {
                    method: 'POST',
                    body: formData,
                }
            ).then(res => res.blob())
                .then(blob => {
                    var file = window.URL.createObjectURL(blob);
                    window.location.assign(file);
                });
            setSubmitted(true)
        } catch (e: any) {
            setError(e?.message)
        } finally {
            setLoading(false)
        }
    };

    return (
        <div>
            <h1 className='text-4xl text-center py-12'>{title}</h1>
            <Form onSubmit={submit} title="Conversion form" subtitle="Convert your toggl entries to clockify">
                {!submitted ? (
                    <>
                        <Input name="project" type="text" label="Project:" value={project} onChange={(e) => setProject(e.target.value)} />
                        <Input name="department" type="text" label="Department:" value={department} onChange={(e) => setDepartment(e.target.value)} />
                        <Input name="user" type="text" label="User:" value={user} onChange={(e) => setUser(e.target.value)} />
                        <Input name="email" type="email" label="Email:" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <Upload name="file" label='Toggl csv export' value={file} onChange={(_file) => setFile(_file)} />
                        <Button onClick={submit} disabled={loading}>{loading ? 'Processing....' : 'Upload'}</Button>
                        {error && <div className='text-red-600'>{error}</div>}
                    </>) : (
                    <div className='text-center py-12 text-gray-500 flex flex-col space-y-2'>
                        <p className='text-4xl'>🎉</p>
                        <p>Your entries have successfully been converted</p>
                        <p>Wait for the download of the converted csv file.</p>
                    </div>
                )}
            </Form>
        </div>
    )
}