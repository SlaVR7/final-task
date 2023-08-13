import HeavyButton from '../buttons/heavyButton'
import { Link } from 'react-router-dom'

interface BannerProps {
  p: string
  h2: string
  h4: string
  buttonText: string
  linkAdress: string
}

export function Banner(content: BannerProps) {
  const { p, h2, h4, buttonText, linkAdress } = content
  return (
    <div className='bg-secondaryColor dark:bg-accentDarkColor w-[550px] rounded-normal p-sm h-min'>
      <p className='text-grayLColor dark:text-secondaryColor text-base font-semibold my-5'>{p}</p>
      <h2 className='text-accentColor dark:text-secondaryColor text-h2 font-bold leading-tight'>{h2}</h2>
      <h4 className='text-grayLColor dark:text-secondaryColor text-h4 font-semibold my-5'>{h4}</h4>
      <Link to={linkAdress}>
        <HeavyButton>{buttonText}</HeavyButton>
      </Link>
    </div>
  )
}
