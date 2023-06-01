import type { NextPage } from 'next'
import { Converter } from '../components/converter'
const TogglConvert: NextPage = () => {
    return <Converter apiPath="/api/toggl" title="Toggl to Clockify" type='toggl' />
}

export default TogglConvert
