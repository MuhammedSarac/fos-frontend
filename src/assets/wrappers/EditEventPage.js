import styled from "styled-components";

const Wrapper = styled.section`
  margin-top: 4rem;
  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
  }
  .jobs {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
  }

  @media (min-width: 992px) {
    .jobs {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
  }
  .content-space {
    gap: 1rem;
  }
  .edit-btn,
  .delete-btn {
    margin-top: 0.5rem;
    letter-spacing: var(--letterSpacing);
    cursor: pointer;
    height: 30px;
    border: 1rem;
  }
  .edit-btn {
    color: var(--green-dark);
    background: var(--green-light);
  }
  .edit-btn:hover {
    color: var(--green-light);
    background: var(--green-dark);
  }
`;
export default Wrapper;
