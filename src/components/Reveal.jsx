import { useInView } from '../hooks'
export default function Reveal({ children, delay = 0, dir = 'up', as: Tag = 'div', className = '', ...rest }) {
  const [ref, seen] = useInView()
  return (
    <Tag ref={ref} className={`reveal ${dir} ${seen ? 'in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }} {...rest}>
      {children}
    </Tag>
  )
}
