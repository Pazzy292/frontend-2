const STEPS = [
  { number: 1, title: 'Search Trip' },
  { number: 2, title: 'Choose Ferry' },
  { number: 3, title: 'Customize Trip' },
  { number: 4, title: 'Passenger Details' },
  { number: 5, title: 'Contact & Account' },
  { number: 6, title: 'Review Booking' },
  { number: 7, title: 'Payment & Ticket' },
];

export default function BookingStepper({ currentStep }) {
  return (
    <section className="booking-stepper" aria-label="Booking steps">
      <div className="container booking-stepper__track">
        {STEPS.map((step, index) => {
          const isDone = step.number < currentStep;
          const isActive = step.number === currentStep;

          return (
            <div
              className={`booking-stepper__item${isDone ? ' is-done' : ''}${isActive ? ' is-active' : ''}`}
              key={step.number}
            >
              <div className="booking-stepper__badge">
                <span>Step {step.number}</span>
              </div>
              <strong>{step.title}</strong>
              {index < STEPS.length - 1 && <span className="booking-stepper__line" aria-hidden="true" />}
            </div>
          );
        })}
      </div>
    </section>
  );
}
