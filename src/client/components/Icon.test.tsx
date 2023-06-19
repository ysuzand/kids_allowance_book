import { render, screen, describe, it } from '@utils/test-utils'
import Icon from './Icon'

const altText = 'this is test'
const props = {
    color: 'blue-500',
    iconSrc: '/food.svg',
    alt: altText
}

describe('Icon.tsx', () => {
    it('renders component', async () => {
        await render(<Icon {...props}/>)
        expect(screen.findByAltText(altText)).toBeDefined()
    })
})

