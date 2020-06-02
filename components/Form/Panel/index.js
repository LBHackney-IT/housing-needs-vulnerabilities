import css from './index.module.scss';

const Panel = ({ children, title }) => {
  return (
    <div className={css['lbh-panel']}>
      {title && <h2 className="lbh-panel__title">{title}</h2>}
      <div className="lbh-panel__body">{children}</div>
    </div>
  );
};

export default Panel;
