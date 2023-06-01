import type { NextPage } from 'next'
import { Converter } from '../components/converter'
const AworkConvert: NextPage = () => {
    return <Converter apiPath="/api/awork" title="Awork to Clockify" type='awork' />
}

export default AworkConvert
