import { useEffect, useRef, useState } from 'react';
import type { Service, ServiceStatus } from '../types';

interface Props {
  services: Service[];
  konamiActive: boolean;
  onStatusChange: (serviceId: string, status: ServiceStatus) => void;
  onResetStatuses: () => void;
  onActivateKonami: () => void;
  onResetKonami: () => void;
  onClose: () => void;
}

const STATUS_NAMES: ServiceStatus[] = ['operational', 'degraded', 'maintenance', 'outage'];
type TerminalOutput = string | { kind: 'neofetch'; lines: string[] };

function getService(services: Service[], name: string): Service | undefined {
  const query = name.toLowerCase();
  return services.find((service) => service.id === query || service.name.toLowerCase() === query);
}

export function Terminal({
  services,
  konamiActive,
  onStatusChange,
  onResetStatuses,
  onActivateKonami,
  onResetKonami,
  onClose,
}: Props) {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState<TerminalOutput[]>([
    'ras@status:~$ terminal ready',
    'Type "help" for available commands.',
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (outputRef.current) outputRef.current.scrollTop = outputRef.current.scrollHeight;
  }, [output]);

  function runCommand(rawCommand: string) {
    const trimmed = rawCommand.trim();
    if (!trimmed) return;
    const args = trimmed.split(/\s+/);
    const [name, firstArg, secondArg] = args;
    const normalizedName = name.toLowerCase();
    const response: TerminalOutput[] = [`ras@status:~$ ${trimmed}`];

    if (normalizedName === 'help') {
      response.push(
        'help                 show this list',
        'neofetch             show system info',
        'services             list current service status',
        'status <id> <state>  change a service',
        'status reset         restore data status',
        'konami activate      trigger the outage sequence',
        'konami reset         restore all service statuses',
        'clear                clear terminal output',
        'exit                 close terminal',
      );
    } else if (normalizedName === 'neofetch') {
      response.push({
        kind: 'neofetch',
        lines: [
          'Ras@Status',
          '--------------------',
          'OS: RasOS Status 2.0',
          'Host: Cloudflare Pages',
          'Theme: Status Dark',
          'Shell: React + TypeScript',
          `Konami: ${konamiActive ? 'active' : 'inactive'}`,
        ],
      });
    } else if (normalizedName === 'services') {
      response.push(...services.map((service) => `${service.id.padEnd(16)} ${service.status}`));
    } else if (normalizedName === 'status' && firstArg?.toLowerCase() === 'reset') {
      onResetStatuses();
      response.push('All services restored to their configured status.');
    } else if (normalizedName === 'status' && firstArg && secondArg) {
      const service = getService(services, firstArg);
      if (!service) {
        response.push(`service not found: ${firstArg}`);
      } else if (!STATUS_NAMES.includes(secondArg as ServiceStatus)) {
        response.push(`unknown status: ${secondArg}`);
      } else {
        onStatusChange(service.id, secondArg as ServiceStatus);
        response.push(`${service.id}: ${secondArg}`);
      }
    } else if (normalizedName === 'konami' && firstArg === 'activate') {
      onActivateKonami();
      response.push('Konami sequence activated. Good luck.');
    } else if (normalizedName === 'konami' && firstArg === 'reset') {
      onResetKonami();
      response.push('Konami sequence reset.');
    } else if (normalizedName === 'clear') {
      setOutput([]);
      setCommand('');
      return;
    } else if (normalizedName === 'exit' || normalizedName === 'quit') {
      onClose();
      return;
    } else {
      response.push(`command not found: ${name}`);
    }

    setOutput((currentOutput) => [...currentOutput, ...response]);
    setCommand('');
  }

  return (
    <div className="terminal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="terminal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="terminal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="terminal-chrome">
          <span id="terminal-title">status terminal</span>
          <button type="button" className="terminal-close" onClick={onClose} aria-label="Close terminal">
            x
          </button>
        </div>
        <div ref={outputRef} className="terminal-output" aria-live="polite">
          {output.map((line, index) => (
            typeof line === 'string' ? (
              <div key={`${line}-${index}`}>{line}</div>
            ) : (
              <div className="neofetch-output" key={`neofetch-${index}`}>
                <img src={`${import.meta.env.BASE_URL}egg.svg`} alt="" aria-hidden="true" />
                <div>
                  {line.lines.map((text) => (
                    <div key={text}>{text}</div>
                  ))}
                </div>
              </div>
            )
          ))}
        </div>
        <form
          className="terminal-form"
          onSubmit={(event) => {
            event.preventDefault();
            runCommand(command);
          }}
        >
          <label htmlFor="terminal-command">ras@status:~$</label>
          <input
            ref={inputRef}
            id="terminal-command"
            value={command}
            onChange={(event) => setCommand(event.target.value)}
            autoComplete="off"
            spellCheck={false}
            aria-label="Terminal command"
          />
        </form>
      </section>
    </div>
  );
}