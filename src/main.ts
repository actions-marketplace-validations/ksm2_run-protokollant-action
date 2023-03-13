import * as core from '@actions/core';
import * as exec from '@actions/exec';

async function main() {
  const bump = core.getInput('bump');

  const args = [bump, '--color', '--json'];
  if (core.getBooleanInput('diff')) {
    args.push('--diff');
  }
  if (core.getBooleanInput('unreleased')) {
    args.push('--unreleased');
  }
  if (!core.getBooleanInput('changelog')) {
    args.push('--no-changelog');
  }

  const output = await exec.getExecOutput('protokollant', args);
  const json = JSON.parse(output.stdout);
  core.setOutput('version', json.version);
  core.setOutput('previous-version', json.previousVersion);
  core.setOutput('bump', json.bump);
}

main().catch((error) => {
  core.setFailed(error.message);
});
