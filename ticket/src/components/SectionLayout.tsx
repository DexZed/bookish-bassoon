import TicketsContainer from "./TicketsContainer"
import TrackingContainer from "./TrackingContainer"


type Props = {}

function SectionLayout({}: Props) {
  return (
    <>
    <section className="flex justify-around">
      <TicketsContainer/>
      <TrackingContainer/>
      
      </section></>
  )
}

export default SectionLayout